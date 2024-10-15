const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;


// middleWare 
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.sgplmdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const tourData = client.db('NexTourDB').collection('TourCollection');
    const userCollection = client.db('NexTourDB').collection('UserCollection');
    const wishlistCollection = client.db('NexTourDB').collection('WishlistCollection');
    const blogsCollection = client.db('NexTourDB').collection('BlogsCollection');


    // Get Operations

    app.get("/tours", async (req, res) => {
      const tours = await tourData.find().toArray();
      res.send(tours);
    });

    app.get("/tour/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const tour = await tourData.findOne(query);
      res.send(tour);
    });

    app.get("/all_user", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
          admin = user.role === 'admin';
      }
      res.send({ admin });
  });

    app.get("/wishlish", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const userWishlist = await wishlistCollection.findOne(query);
      res.send(userWishlist);
    });

    app.get("/all_blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await blogsCollection.findOne(query);
      res.send(blog);
    });


    // Post Operations

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.post("/add_to_wishlist", async (req, res) => {
      const { email, tourId, packageType } = req.body;

      if (!email || !tourId || !packageType) {
        return res.status(400).send('Email, Tour ID, and Package Type are required');
      }
      try {
        // Check if the wishlist for this user exists
        const userWishlist = await wishlistCollection.findOne({ email });

        const newWishlistItem = { tourId, packageType };

        if (userWishlist) {
          // If the wishlist exists, check if the tour is already there
          const alreadyInWishlist = userWishlist.wishlist.some(
            (item) => item.tourId === tourId && item.packageType === packageType
          );

          if (!alreadyInWishlist) {
            await wishlistCollection.updateOne(
              { email },
              { $push: { wishlist: newWishlistItem } }
            );
            return res.status(200).send('Tour with package added to wishlist');
          } else {
            return res.status(400).send('Tour with this package is already in the wishlist');
          }
        } else {
          // If no wishlist exists, create a new one
          await wishlistCollection.insertOne({
            email,
            wishlist: [newWishlistItem]
          });
          return res.status(201).send('Wishlist created and tour with package added');
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).send('Internal server error');
      }

    });

    app.post("/add_blog", async (req, res) => {
      const newBlog = req.body;
      const result = await blogsCollection.insertOne(newBlog);
      res.send(result);
    });


    // Delete Operation 

    app.delete("/remove_from_wishlist", async (req, res) => {
      const { email, tourId, packageType } = req.query;

      if (email && tourId && packageType) {
        const result = await wishlistCollection.updateOne(
          { email: email },
          {
            $pull: {
              wishlist: {
                tourId: tourId,
                packageType: packageType
              }
            },
          }
        );

        res.send(result);
      }
    });


    app.delete("/remove_blog", async (req, res) => {
      const id = req.query;

      if (id) {
        const query = { _id: new ObjectId(id) };
        const result = await blogsCollection.deleteOne(query);
        res.send(result);
      }

    });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('NexTour Server is running');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
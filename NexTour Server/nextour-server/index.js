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
    const blockedUsersCollection = client.db('NexTourDB').collection('BlockedUsers');


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
      const userWishlist = await wishlistCollection.find(query).toArray();
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

    app.get("/blockedUsers", async (req, res) => {
      const result = await blockedUsersCollection.find().toArray();
      res.send(result);
    });



    // Post Operations

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.post("/add_to_wishlist", async (req, res) => {
      const { email, tourId, packageType } = req.body
      const alreadyOnList = await wishlistCollection.findOne({
        email: email,
        tourId: tourId,
        packageType: packageType
      });
      if (!alreadyOnList) {
        await wishlistCollection.insertOne({
          email: email,
          tourId: tourId,
          packageType: packageType
        });
        return res.status(201).send('Wishlist created and tour with package added');
      }
      else {
        return res.status(400).send('Tour with this package is already in the wishlist');
      }
    });

    app.post("/add_blog", async (req, res) => {
      const newBlog = req.body;
      const result = await blogsCollection.insertOne(newBlog);
      res.send(result);
    });

    app.post("/add_to_blocklist", async (req, res) => {
      const blockedUser = req.body;
      const result = await blockedUsersCollection.insertOne(blockedUser);
      res.send(result);
    });

    app.post("/add_new_spot", async(req,res) => {
      const newSpot = req.body;
      const result = await tourData.insertOne(newSpot);
      res.send(result);
    });



    // Put/Patch Operations

    app.put("/update_role", async(req,res) => {
      const {userId, newRole} = req.body;

      if(userId && newRole) {
        const id = { _id: new ObjectId(userId) };
        const updatedRole = {
          $set: {role: newRole},
        };

        const result = await userCollection.updateOne(id, updatedRole);
        res.send(result);
      }
    });

    app.patch('/update_tour/:id', async(req,res) => {
      const tourId = req.params.id;
      const updatedTour =  req.body;

      if(tourId && updatedTour){
        const id = { _id: new ObjectId(tourId) };
        const result = await tourData.updateOne(id, { $set: updatedTour });
        res.send(result);
      }
    })


    // Delete Operation 

    app.delete("/remove_from_wishlist", async (req, res) => {
      const { email, tourId, packageType } = req.query;

      if (email && tourId && packageType) {
        const result = await wishlistCollection.deleteOne(
          {
            email: email,
            tourId: tourId,
            packageType: packageType
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

    app.delete("/remove_user", async (req, res) => {
      const id = req.query;

      if (id) {
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        res.send(result);
      }
    });

    app.delete("/remove_tour", async(req,res) => {
      const id = req.query;

      if (id) {
        const query = { _id: new ObjectId(id) };
        const result = await tourData.deleteOne(query);
        res.send(result);
      }
    })


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
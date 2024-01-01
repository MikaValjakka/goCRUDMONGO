package controllers

import (
	"context"
	"log"
	"net/http"

	"github.com/MikaValjakka/gomongoCRUD/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection

func init() {
	// Initialize MongoDB collection once -> PS. In production the database is set to cloud
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	db := client.Database("goUsers")
	userCollection = db.Collection("users")
}

// UsersRead handles the GET /users endpoint
func UsersRead(c *gin.Context) {
	var users []bson.M

	// Find all users in the MongoDB collection
	cursor, err := userCollection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Println(err)
		c.Status(500)
		return
	}
	defer cursor.Close(context.Background())

	// Decode the results into a slice
	if err := cursor.All(context.Background(), &users); err != nil {
		log.Println(err)
		c.Status(500)
		return
	}

	// Return the users as JSON
	c.JSON(200, gin.H{"users": users})
}

func UsersCreate(c *gin.Context) {
	// Parse JSON request body
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate a new ObjectID for the user
	newUser.ID = primitive.NewObjectID()

	// Insert the user into the MongoDB collection
	result, err := userCollection.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Return the created user
	c.JSON(http.StatusCreated, gin.H{"user": newUser, "insertedID": result.InsertedID})
}

// UsersDelete handles the DELETE /users/:id endpoint
func UsersDelete(c *gin.Context) {
	// Get user ID from the URL parameter
	userID := c.Param("id")

	// Convert the string ID to ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Define the filter to find the user by ID
	filter := bson.M{"_id": objectID}

	// Delete the user from the MongoDB collection
	result, err := userCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println(err)
		c.Status(500)
		return
	}

	// Check if any document was deleted
	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// UsersUpdate handles the PUT /users/:id endpoint
func UsersUpdate(c *gin.Context) {
	// Get user ID from the URL parameter
	userID := c.Param("id")

	// Convert the string ID to ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Parse JSON request body
	var updatedUser models.User
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Define the filter to find the user by ID
	filter := bson.M{"_id": objectID}

	// Define the update to apply
	update := bson.M{"$set": bson.M{}}

	// Update fields only if they are not empty in the request
	if updatedUser.Name != "" {
		update["$set"].(bson.M)["name"] = updatedUser.Name
	}
	if updatedUser.Email != "" {
		update["$set"].(bson.M)["email"] = updatedUser.Email
	}
	if updatedUser.Password != "" {
		update["$set"].(bson.M)["password"] = updatedUser.Password
	}

	// Perform the update in the MongoDB collection
	result, err := userCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println(err)
		c.Status(500)
		return
	}

	// Check if any document was modified
	if result.ModifiedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

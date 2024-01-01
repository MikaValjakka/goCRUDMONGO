package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user in MongoDB
type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}
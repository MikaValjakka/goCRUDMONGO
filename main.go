package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/MikaValjakka/gomongoCRUD/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
  // creating router
	router := gin.Default()

	// Allow frondend cross-origin
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // frontend URL vite
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
    


	
	// Enable CORS (Cross-Origin Resource Sharing) to allow frontend access from a different origin.
router.Use(cors.New(config))

// Serve static files from the "public/assets" directory under the "/assets" URL path.
router.Static("/assets", "./public/assets")

// Serve static files from the "public/images" directory under the "/images" URL path.
router.Static("/images", "./public/images")

// Handle the root URL ("/") by serving the frontend or fallback to serving "public/index.html".
router.GET("/", serveFrontend)

// Handle HTTP POST requests to create a new user.
router.POST("/users", controllers.UsersCreate)

// Handle HTTP PUT requests to update a user by ID.
router.PUT("/users/:id", controllers.UsersUpdate)

// Handle HTTP GET requests to retrieve a list of users.
router.GET("/users", controllers.UsersRead)

// Handle HTTP DELETE requests to delete a user by ID.
router.DELETE("/users/:id", controllers.UsersDelete)

// Listen and run the Gin server.
router.Run()
	
}

func serveFrontend(c *gin.Context) {
    // Serve the entire "public" directory
    filePath := filepath.Join("public", c.Request.URL.Path)
    fmt.Println("Requested File Path:", filePath)

    // Check if the requested file exists
    _, err := os.Stat(filePath)
    if err != nil {
        // File not found, serve the "index.html" instead
        filePath = filepath.Join("public", "index.html")
    }

    c.File(filePath)
}
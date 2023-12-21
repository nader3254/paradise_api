# MisrMedical-Backend

this will be the backend for misr Medical website

## Routes 


#### to publish a new image to be used later :

    POST http://localhost/publish_image 

    {
      mimetype:"",
      originalname:"",
      buffer:""
    }

return:

    {
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: url,
    }

#### to publish a new product :

    POST http://localhost/products

    {
      id: product_count,
      title: product_name,
      info: product_details,
      img: product_image,
    }

#### to modify a specified product :

    PUT http://localhost/products

    {
      id: product_count,
      title: product_name,
      info: product_details,
      img: product_image,
    }

#### to delete a specified product :

    DELETE http://localhost/products

    {
      id: product_count,
    }

#### to get all product :

    GET http://localhost/products

return 

    [
        {
            id: product_count,
            title: product_name,
            info: product_details,
            img: product_image,
        },
        {
            id: product_count,
            title: product_name,
            info: product_details,
            img: product_image,
        }
        ......
    ]

#### to get product by id :

    GET http://localhost/products/:id

return 

    {
        id: product_count,
        title: product_name,
        info: product_details,
        img: product_image,
    },
   

#### to search for specific product :

    GET http://localhost/products/search/:keyword

return 

    [
        {
            id: product_count,
            title: product_name,
            info: product_details,
            img: product_image,
        },
        {
            id: product_count,
            title: product_name,
            info: product_details,
            img: product_image,
        }
        ......
    ]





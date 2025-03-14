import multer from 'multer';

const storage = multer.diskStorage({ // defines how and where uploaded files should be stored (here, in disk storage)
    destination: function (req, file, cb) {  // Sets the Folder Where Files Are Stored

        // cb is callback function , file contains uploaded file's information (name, type,...),  null is error, './public/temp' is destination


        cb(null, './public/temp') // null is used for how to handle error
    },
    filename: function (req, file, cb) {  //  Sets the Name of the Saved File
        cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage: storage 
})
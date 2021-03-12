module.exports = new class HomeController {
    index(req , res) {
        // res.json('Welcome to api');    
        // res.json(404,'Welcome to api');    
        res.status(200).json('not found');    
    }

    version(req , res) {
        res.json('version 1')
    }
}
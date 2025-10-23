import jwt from 'jsonwebtoken';

export const createUser =async (req, res) => {
    try {
        console.log(req.body);

        // Normally: save user in DB here
        const user = {
            id: 1, // DB से auto-generated
            name: req.body.name,
            email: req.body.email
        };

        // JWT token generate करें
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'your_secret_key', // इसे env में रखो
            { expiresIn: '7d' } // token 7 दिन valid रहेगा
        );

        res.send({
            message: 'User created successfully',
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Something went wrong' });
    }
};

export const login=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
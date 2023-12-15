import express from 'express';
const router = express.Router()

router.all('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Redirect the user to the login page or another appropriate page
      res.redirect('/login'); 
    });
  });

  export default router;
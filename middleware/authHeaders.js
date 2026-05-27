const jwt = require('jsonwebtoken');



exports.verifyToken = (req, res, next) => {

  const publicPaths = [
    '/api/auth/login',
    '/api/auth/signup',
    // '/api/todo/getTodos'

  ];

  const dynamicPublicPaths = [
    // '/api/todo/getTodos/:id'
    // '/todo/updateTodo/:id',
    // '/todo/deleteTodo/:id',
  ];


  // Allow public routes
  if (publicPaths.includes(req.path) ||
    dynamicPublicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (authHeader) {

    // console.log(authHeader);
    const token = authHeader.split(' ')[1];

    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Store decoded token in req.user
      // console.log(req.user,'userss')
      next();
    } catch (error) {
      return res.status(707).json({ message: 'Invalid or expired token', status_code: 707, data: null });
    }
  } else {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
};




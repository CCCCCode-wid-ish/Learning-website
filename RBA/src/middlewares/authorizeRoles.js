//Creating the role based

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.student.role)) {
            return res
              .status(403)
              .json({ message: "Access denied :insufficient permissions" });
        }
        next();
    }
}

module.exports = authorizeRoles;
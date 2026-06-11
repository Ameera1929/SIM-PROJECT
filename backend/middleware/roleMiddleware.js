exports.isSuperAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (req.user.role !== "super_admin") {
        return res.status(403).json({
            success: false,
            message: "Access Denied"
        });
    }

    next();
};

exports.canManageProducts = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (req.user.role === "customer_admin") {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Access Denied"
    });
};

exports.canViewProducts = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const role = req.user.role;

    if (
        role === "customer_admin" ||
        role === "customer_user"
    ) {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Access Denied"
    });
};
module.exports = ({ meta, config, managers }) => {
  return ({ req, res, next }) => {
    if (req.user.role !== "super-admin")
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "unauthorized",
      });
    next(req, res);
  };
};

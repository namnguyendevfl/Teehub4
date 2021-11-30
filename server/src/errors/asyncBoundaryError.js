const asyncBoundaryError = (delegate, defaultStatus) => {
    return (req, res, next) => {
        const errMessage = "Your phone number or email has already existed. Please chose another one"
        return Promise.resolve()
        .then(() => delegate(req, res, next))
        .catch((err) => {
            const { status = defaultStatus, message = errMessage } = err || {};
            next({status, message});
        });
    }
}

module.exports = asyncBoundaryError
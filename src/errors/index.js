// Aquí van los error-handlings (manejo de errores por medio de los middlewares)

export const handlingErrors = (app) => {
    app.use((req, res, next) => {
        res.status(404).json({ message: "This route does not exist." });
    });

    app.use((err, req, res, next) => {
        // whenever you call next(err), this middleware will handle the error
        // always logs the error
        console.error("ERROR", req.method, req.path, err);

        // only render if the error ocurred before sending the response
        if (!res.headersSent) { // if the response has not been sent yet
            res.status(500).json({
                message: "Internal server error. Check the server console",
            });
        }
    });
}
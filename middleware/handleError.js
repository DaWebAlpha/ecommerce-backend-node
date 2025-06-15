export function handleError(err,req, res, next){
    console.error(err)
    if(res.headersSent){
        return next(err)
    }
    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    })
}
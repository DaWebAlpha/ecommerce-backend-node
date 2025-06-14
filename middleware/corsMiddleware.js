export function cors(req, res, next){
    const origin = req.headers.origin

    res.setHeader('Access-Control-Allow-Origin', origin ||  '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') return res.sendStatus(204)
    
    next()
}
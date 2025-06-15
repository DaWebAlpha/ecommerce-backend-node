import express from 'express'
import { autoCatchFn } from '../lib/autoCatchFn.js'


export function listProducts(dataFetcher){
    return autoCatchFn(async function(req, res, next){
        const data = await dataFetcher();
        if(!data) return next(new Error('No Products Found'))
        res.json(data)
        
    })
}
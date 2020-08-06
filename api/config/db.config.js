const db = () => {
  console.log('function db'+ process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'development'){
    console.log('connected to mongodb container')
    return 'mongodb://' + process.env.DEV_DB_CONTAINER + "/" + process.env.DEV_DB_NAME
  }
  if(process.env.NODE_ENV === 'production'){
    console.log('mongodb+srv://'+process.env.PROD_DB_USER+':'+process.env.PROD_DB_PASSWORD+'@'+process.env.PROD_DB_CLUSTERName+'-3tthm.gcp.mongodb.net/'+process.env.PRD_DB_NAME+'?retryWrites=true&w=majority')
    return 'mongodb+srv://'+process.env.PROD_DB_USER+':'+process.env.PROD_DB_PASSWORD+'@'+process.env.PROD_DB_CLUSTERName+'-3tthm.gcp.mongodb.net/'+process.env.PRD_DB_NAME+'?retryWrites=true&w=majority'
  }
  return null;
}
exports.db = db;
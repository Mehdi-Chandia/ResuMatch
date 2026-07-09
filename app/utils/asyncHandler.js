const asyncHandler=(fn)=> async (req,res,next)=>{
    try {
       return await fn(req, res,next);
    }catch(err){
        return Response.json({
            success:false,
            message:err.message,
            status:err.status || 500,
        },{status:err.status || 500})
    }
}

export default asyncHandler;
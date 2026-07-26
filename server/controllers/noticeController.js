import Notice from "../models/Notice.js"

const getNotices = async (req, res) => {
    try{
        const notice = await Notice.find()
        return res.status(200).json({success: true, notice})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't get notice!!"}) 
    }
}

const addNotices = async (req, res) => {
    try{
        const {notice_name, notice_desc} = req.body;
        const newNotice = new Notice({
            notice_name,
            notice_desc
        })
        await newNotice.save()
        return res.status(200).json({success: true, notice: newNotice})
    }catch (error){
        return res.status(500).json({success: false, error: "server error! can't add notice!!"})
    }
}

const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;

        const notice = await Notice.findByIdAndDelete(id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                error: "Notice not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notice deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Unable to delete notice"
        });
    }
}

export {getNotices, addNotices, deleteNotice}
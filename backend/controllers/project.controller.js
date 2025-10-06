const projectModel = require("../models/project.model.js");

const createProject = async (req, res) => {
    const { projectname, projectgenre } = req.body;
    try {
        if (!projectname || !projectgenre) {
            return res.status(400).json({ error: "Please fill all the required fields." })
        }
        const newProject = new projectModel({
            projectname: projectname,
            projectgenre: projectgenre,
            userId: req.user?._id,
        });

        await newProject.save();

        res.status(201).json({ message: "New project created successfully." });
    } catch (error) {
        console.error("Error in create project controller : ", error);
        res.status(400).json({ error: "Internal Server error." });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.status(200).json({ message: "Projects fetched successfully.", projects })
    } catch (error) {
        console.error("Error in getProjects controller : ", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}

const deleteProject = async (req, res) => {
    const {id} = req.body;
    try {
        const project = await projectModel.deleteOne({_id:id});
        res.status(200).json({message:"A project deleted successfully."});
    } catch (error) {
        console.error("Error in deleteProject controller : ", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
}

const saveProject = async (req, res) => {
    try {
        const { id, data } = req.body;

        if (!id || !data) {
            return res.status(400).json({ error: "Project ID and data are required." });
        }

        const project = await projectModel.findOneAndUpdate(
            { _id: id, userId: req.user?._id }, 
            { data },
            { new: true } 
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }

        res.status(200).json({ message: "Project saved successfully.", project });
    } catch (error) {
        console.error("Error in saveProject controller:", error);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = { createProject, getProjects , deleteProject , saveProject };
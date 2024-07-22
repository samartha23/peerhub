import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProject = async (req, res) => {
  try {
    const { title, tagline, description, projectLink, opensource } = req.body;
    const userId = req.user.id; // Assuming you have user ID from the authentication middleware
    // Validate the required fields
    if (!title || !tagline) {
      return res.status(400).json({
        status: "error",
        error: "Title and tagline are required fields.",
      });
    }
    // Create the project in the database
    const newProject = await prisma.project.create({
      data: {
        userId: userId,
        title: title,
        tagline: tagline,
        description: description || null,
        projectLink: projectLink || null,
        opensource: opensource,
      },
    });

    // Return success response
    res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while adding the project. Please try again later.",
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID from authentication middleware

    // Fetch the projects for the user
    const projects = await prisma.project.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    // Return success response with projects
    res.status(200).json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the projects. Please try again later.",
    });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id; // Assuming the project ID is passed in the URL parameters

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            firstname: true,
            lastname: true,
            bio: true,
            website: true,
            profileImageUrl: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        status: "error",
        error: "Project not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the project. Please try again later.",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tagline, description, projectLink, opensource } = req.body;
    const userId = req.user.id;
    // Validate the required fields
    if (!title || !tagline) {
      return res.status(400).json({
        status: "error",
        error: "Title and tagline are required fields.",
      });
    }
    const existingProject = await prisma.project.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        status: "error",
        error: "Project not found or you don't have permission to update it.",
      });
    }

    // Update the project in the database
    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: {
        title: title,
        tagline: tagline,
        description: description || null,
        projectLink: projectLink || null,
        opensource: opensource,
      },
    });

    // Return success response
    res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while updating the project. Please try again later.",
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if the project exists and belongs to the user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        status: "error",
        error: "Project not found or you don't have permission to delete it.",
      });
    }

    // Delete the project from the database
    await prisma.project.delete({
      where: { id: id },
    });

    // Return success response
    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while deleting the project. Please try again later.",
    });
  }
};

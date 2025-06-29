import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/authType";
import sequelizeObject from "../../../database/connection";

const createCategory = async (req: IExtendedRequest, res: Response) => {
  // Extracting the institute ID from the request
  const instituteID = req.user?.currentInstituteID;

    // Check if instituteID is provided
  if (!instituteID) {
    res.status(400).json({
      success: false,
      message: "Institute ID is required.",
    });
    return;
  }

  const { categoryName, categoryDescription } = req.body;

  // Validate the request body
  if (!categoryName || !categoryDescription) {
    res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
    return;
  }

  try {
    const returnObject = await sequelizeObject.query(
      `
        INSERT INTO category_${instituteID} (id, categoryName, categoryDescription)
        VALUES (gen_random_uuid(), ?, ?)
      `,
      {
        replacements: [categoryName, categoryDescription],
      }
    );

    // Check if the insertion was successful
    if (
      returnObject &&
      typeof returnObject[1] === "number" &&
      returnObject[1] > 0
    ) {
      res.status(201).json({
        success: true,
        message: "Category created successfully.",
      });
      return;
    }

  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }
};

const getCategories = async (req: IExtendedRequest, res: Response) => {
    
    const instituteID = req.user?.currentInstituteID;

    // Check if instituteID is provided
    if (!instituteID) {
        res.status(400).json({
            success: false,
            message: "Institute ID is required.",
        });
        return;
    }

    try {

        const categories = await sequelizeObject.query(
            `SELECT * FROM category_${instituteID}`,
        );

        if (categories.length > 0) {
            res.status(200).json({
                success: true,
                categories: categories,
            });
            return;
        } else {
            res.status(404).json({
                success: false,
                message: "No categories found.",
            });
            return;
        }

    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

const deleteCategory = async (req: IExtendedRequest, res: Response) => {
    const instituteID = req.user?.currentInstituteID;
    const { categoryId } = req.params;

    // Check if instituteID is provided
    if (!instituteID) {
        res.status(400).json({
            success: false,
            message: "Institute ID is required.",
        });
        return;
    }

    const returnObject = await sequelizeObject.query(`
        DELETE FROM category_${instituteID} WHERE id = ?
    `, {
        replacements: [categoryId],
    });

    if (returnObject && typeof returnObject[1] === "number" && returnObject[1] > 0) {
        res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });
        return;
    } else {
        res.status(404).json({
            success: false,
            message: "Category not found.",
        });
        return;
    }
}


export { createCategory, getCategories, deleteCategory };
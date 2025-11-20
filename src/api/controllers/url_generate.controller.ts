import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../../types/enums/HttpStatus";
import { RequestHandler } from "express";
import { UrlModel } from "../models/Url";
import { IUrl } from "../../types/interfaces/url";

export const createURL: RequestHandler = async (req, res) => {
  const {
    long_url,
    short_url,
    userId,
    clicks,
    campaignId,
    tags,
    status,
  }: IUrl = req.body;
  try {
    const newURL = await new UrlModel({
      campaignId: campaignId,
      clicks: clicks,
      long_url: long_url,
      short_url: short_url,
      tags: tags,
      userId: userId,
      status: status,
    });
    const savedURL = await newURL.save();
    logger.info("Create URL Service query was success");
    console.log("Create URL Service query was success");
    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new SuccessResponse(
          HTTP_STATUS.CREATED,
          "Create URL Service query was success",
          savedURL
        )
      );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Create URL Service query internal server error",
          error
        )
      );
  }
};

export const getSingleURLById: RequestHandler = async (req, res) => {
  try {
    const url = await UrlModel.findById(req.params.urlId);

    if (!url) {
      logger.info("Get single URL by id query was failed");
      console.log("Get single URL by id query was failed");
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(
          new ErrorResponse(
            HTTP_STATUS.NOT_FOUND,
            "Get single URL by id query was failed",
            "URL id not found",
          )
        );
    }

    logger.info("Get single URL by id query was success");
    console.log("Get single URL by id query was success");
    res
      .status(HTTP_STATUS.OK)
      .json(
        new SuccessResponse(
          HTTP_STATUS.OK,
          "Get single URL by id query was success",
          url
        )
      );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Get single URL by id query internal server error",
          error
        )
      );
  }
};

export const getURLsByUserId: RequestHandler = async (req, res) => {
  try {
    const urls = await UrlModel.find({ userId: req.params.userId });

    logger.info("Get urls by userId query was success");
    console.log("Get urls by userId query was success");
    res
      .status(HTTP_STATUS.OK)
      .json(
        new SuccessResponse(
          HTTP_STATUS.OK,
          "Get urls by userId query was success",
          urls
        )
      );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Get urls by userId query internal server error",
          error
        )
      );
  }
};

export const deleteURL: RequestHandler = async (req, res) => {
  try {
    const url = await UrlModel.findById(req.params.urlId);

    if (!url) {
      logger.info("Delete url query was failed");
      console.log("Delete url query was failed");
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(
          new ErrorResponse(
            HTTP_STATUS.NOT_FOUND,
            "Delete url query was failed",
            "URL id not found",
          )
        );
    }

    await UrlModel.findByIdAndDelete(req.params.urlId);

    logger.info("Delete url query was success");
    console.log("Delete url query was success");
    res
      .status(HTTP_STATUS.NO_CONTENT)
      .json(
        new SuccessResponse(
          HTTP_STATUS.NO_CONTENT,
          "Delete url query was success",
          "URL deleted successfully",
        )
      );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Delete url query internal server error",
          error
        )
      );
  }
};

export const updateURL: RequestHandler = async (req, res) => {
  try {
    const url = await UrlModel.findById(req.params.urlId);

    if (!url) {
      logger.info("Update url query was failed");
      console.log("Update url query was failed");
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(
          new ErrorResponse(
            HTTP_STATUS.NOT_FOUND,
            "Update url query was failed",
            "URL id not found",
          )
        );
    }

    const updatedURL = await UrlModel.findByIdAndUpdate(
        req.params.urlId,
        req.body,
        { new: true }
    );

    logger.info("Update url query was success");
    console.log("Update url query was success");
    res
      .status(HTTP_STATUS.ACCEPTED)
      .json(
        new SuccessResponse(
          HTTP_STATUS.ACCEPTED,
          "Update url query was success",
          updatedURL
        )
      );
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Update url query internal server error",
          error
        )
      );
  }
};
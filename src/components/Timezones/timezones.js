const app = require("express");
const handleError = require("../../utils/handleError");
const {
  getTimezones,
  getTimezone,
  getTimezonesMongo,
  insertTimezone,
  deleteTimezone,
} = require("./services");
const router = app.Router({ mergeParams: true });

router

  .get("/", async (req, res) => {
    const timezones = await getTimezones();
    if (!timezones) {
      return res.status(404).json({
        success: false,
        message: "Error get timezones",
      });
    }

    const { data } = timezones;
    return res.status(200).json({
      success: true,
      message: "Success get timezones",
      body: {
        timezones: data,
      },
    });
  })

  .get(
    "/saved",
    handleError(async (req, res) => {
      const { page, limit } = req.query;
      const timezones = await getTimezonesMongo(page, limit);
      console.log(timezones);
      return res.status(200).json({
        body: { timezones },
      });
    }),
  )

  .get("/:continent/:country", async (req, res) => {
    const { continent, country } = req.params;
    const findTimezone = `${continent}/${country}`;

    const timezones = await getTimezone(findTimezone);
    if (!timezones) return res.status(404).json({});

    const { data } = timezones;
    return res.status(200).json({
      body: {
        timezone: data,
      },
    });
  })

  .put(
    "/:continent/:country",
    handleError(async (req, res) => {
      const { continent, country } = req.params;
      const findTimezone = `${continent}/${country}`;
      const timezone = await getTimezone(findTimezone);
      if (timezone) {
        const newTimezone = await insertTimezone(timezone);
        return res.status(200).json({
          success: true,
          message: "Congrulations timezone updated",
          body: newTimezone,
        });
      }
    }),
  )

  .put(
    "/:continent/:country/:city",
    handleError(async (req, res) => {
      const { continent, country, city } = req.params;
      const findTimezone = `${continent}/${country}/${city}`;
      const timezone = await getTimezone(findTimezone);
      if (timezone) {
        const newTimezone = await insertTimezone(timezone);
        return res.status(200).json({
          body: newTimezone,
        });
      }
    }),
  )

  .delete(
    "/:id",
    handleError(async (req, res) => {
      const { id } = req.params;
      const deleted = await deleteTimezone(id);
      return res.status(200).json({
        success: true,
        message: "Congrulations timezone deleted",
        body: deleted,
      });
    }),
  );

module.exports = router;

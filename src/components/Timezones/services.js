const axios = require("axios");
const handleError = require("../../utils/handleError");
const { timezonesSchema } = require("./schemas");

exports.getTimezones = async () => {
    try {
        const apiUrl = process.env.API_TIMEZONES;
        const timezones = await axios.get(apiUrl);
        return timezones;
    } catch (error) {
        return error;
    }
};

exports.getTimezonesMongo = handleError(async (page, limit) => {
    let options = {};
    if (page && limit) {
        options = {
            page,
            limit,
            sort: { _id: -1 },
        };
    } else {
        options = {
            pagination: false,
            sort: { _id: -1 },
        };
    }

    const find = await timezonesSchema.paginate({}, options, (err, result) => {
        if (err) {
            console.error("🔥 Error on stock listing. ", err);
            return false;
        }
        return result;
    });
    return find;
});

exports.getTimezone = handleError(async (timezone) => {
    const apiUrl = process.env.API_TIMEZONES;
    const finded = await axios.get(`${apiUrl}/${timezone}`);
    return finded.data;
});

exports.insertTimezone = async (insertTimezone) => {
    try {
        const { unixtime, timezone } = insertTimezone;
        const newTimezone = await timezonesSchema.create({
            timezone,
            unixtime,
        });
        return newTimezone;
    } catch (error) {
        console.log("ZZZZZZZZZZZ" + error);
    }
};

exports.deleteTimezone = handleError(async (idTimezone) => {
    const deleted = await timezonesSchema.deleteOne({ _id: idTimezone });
    return deleted.deletedCount;
});

exports.updateTimezone = async (code, toUpdate) => {
    const stockUpdated = await timezonesSchema.updateOne(
        {
            _id: code,
        },
        toUpdate,
    );
    return stockUpdated.nModified;
};

exports.modifyQuantity = async (_id, number) => {
    const stockUpdated = await timezonesSchema.updateOne(
        {
            _id,
        },
        {
            $inc: { quantity: number },
        },
    );
    return stockUpdated.nModified;
};

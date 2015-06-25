var lat = function (photo) {
    return photo.geometry.coordinates[0];
};

var lon = function (photo) {
    return photo.geometry.coordinates[1];
};

module.exports = {
    bounds: function (photos) {
        var bounds = {
            min_latitude : undefined,
            max_latitude : undefined,
            min_longitude : undefined,
            max_longitude : undefined
        };

        if (photos.length > 0) {
            bounds.min_latitude = bounds.max_latitude = lat(photos[0]);
            bounds.min_longitude = bounds.max_longitude = lon(photos[0]);

            photos.slice(1).forEach(function (photo) {
                if (lat(photo) < bounds.min_latitude) {
                    bounds.min_latitude = lat(photo);
                }

                if (lat(photo) > bounds.max_latitude) {
                    bounds.max_latitude = lat(photo);
                }

                if (lon(photo) < bounds.min_longitude) {
                    bounds.min_longitude = lon(photo);
                }

                if (lon(photo) > bounds.max_longitude) {
                    bounds.max_longitude = lon(photo);
                }
            });
        }

        return bounds;
    },

    center: function (bounds) {
        return {
            latitude: (bounds.min_latitude + bounds.max_latitude) / 2,
            longitude: (bounds.min_longitude + bounds.max_longitude) / 2
        };
    }
};
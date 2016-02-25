var createThumb = function(fileObj, readStream, writeStream) {
  // Transform the image into a 10x10px thumbnail
  gm(readStream, fileObj.name()).resize('1000', '1000').autoOrient().stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
    stores: [/*new FS.Store.FileSystem("images", { path: "~/uploads",transformWrite: createThumb  })*/
        new FS.Store.S3("images", {
            region: "eu-west-1",
            accessKeyId: "AKIAJBT2WKG44ZO743HA",
            secretAccessKey: "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",
            bucket: "risifrutti"/*,
            transformWrite: createThumb*/
        })
    ],
    filter: {
        maxSize: 10048576, // in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg', 'jpeg']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(`Något gick fel vid uppladdningen av kvittot (${message})`);
            } else {
                console.log(message);
            }
        }
    }
});

Images.allow({
    insert: function (userId) {
        return !!userId;
    },
    update: ()=> true,
    download: () => true
});
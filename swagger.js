const swaggerAutogen = require("swagger-autogen")();
const port = process.env.PORT || 3001;
const doc = {
  info: {
    version: "1.0.0",
    title: "Poseidon API",
    description:
      "Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
  host: `localhost:${port}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  // Cho nay define section trong swagger, sau do add tag tuong ung trong API
  tags: [
    // {
    //   name: "User",
    //   description: "Endpoints",
    // },
  ],
  // Cho nay define authorization settings
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        read_pets: "read your pets",
        write_pets: "modify pets in your account",
      },
    },
  },
  // Cho nay define model reference
  definitions: {
    GenerateTokenRequest: {
      $token: "SomeSpecialString",
      $pageId: "a$b%som3thing",
    },
    SignUpRequest: {
      username: "Nguyen Bang Hoang",
      password: "String",
      email: "hoangmrb@gmail.com",
      phone: "0986323066",
      location: "Ha Noi",
    },
    createAreaModel: {
      name: "Ten Khu Vuc",
      ownerIds: ["string"],
      location: "Ha Noi",
    },
    createPoolModel: {
      name: "String",
      // ownerId: "mongoose.SchemaTypes.ObjectId - 5ff6c9d75d8593237c1c5b5d",
      areaId: "mongoose.SchemaTypes.ObjectId - 5ff6c9d75d8593237c1c5b5d",
      target: "String",
      unit: "String",
    },
    getUserModel: {
      userId: "mongoose.SchemaTypes.ObjectId - 5ff6c9d75d8593237c1c5b5d",
    },
    createTransactionModel: {
      walletId: "mongoose.SchemaTypes.ObjectId",
      creatorId: "mongoose.SchemaTypes.ObjectId",
      createdDate: 1610167187000,
      quantity: 0,
      title: "Transaction's title",
      customData: {
        note: "Do smt",
      },
    },
    getTransactionsInRangesByCreatorId: {
      creatorId: "mongoose.SchemaTypes.ObjectId",
      startDate: 1610167187000,
      endDate: 1610348546000
    },
    getTransactionsInRangesByWalletIdModel: {
      walletId: "mongoose.SchemaTypes.ObjectId",
      startDate: 1610167187000,
      endDate: 1610348546000
    },
    createNoteModel: {
      noteType: "NoteType",
      notes: [
        {
          date: 1610167187000,
          content: ["Note 1"],
          creatorId: 'mongoose.SchemaType.ObjectId'
        }
      ],
      areaId: 'mongoose.SchemaType.ObjectId',
      poolId: 'mongoose.SchemaType.ObjectId',
    }
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js"); // Your project's root file
});

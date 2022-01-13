const app = require("../../../index");
const UserRepository = require("../../repository/UserRepository");
const request = require("supertest");
const { generateHash, decrypt } = require("../../helpers/crypt");

describe("Unity test User repository", () => {
  afterAll(() => {
    app.close();
  });

  it("should list all users", async () => {
    // Arrange
    // Prepara o ambiente para o teste
    const mockProperties = [
      "id",
      "name",
      "email",
      "password",
      "createdAt",
      "updatedAt",
    ];
    // Act
    // Executa a ação que será testada

    const response = await request(app).get(
      "/users",
      async () => await UserRepository.getAll()
    );

    //Assert
    expect(response.status).toBe(200);
    expect(Object.keys(response.body[0]).sort()).toEqual(mockProperties.sort());
  });

  it("should create a new user", async () => {
    // Arrange
    // Prepara o ambiente para o teste
    const expected = [
      "id",
      "name",
      "email",
      "password",
      "updatedAt",
      "createdAt",
    ];
    // Act
    // Executa a ação que será testada
    const userCreated = await UserRepository.create(
      "Rodolfo Henrique Silva",
      "rodolfo222@gmail.com",
      "123456789"
    );

    if (userCreated.message) {
      return expect(userCreated.message).toEqual("User already exists");
    }

    //Assert
    // Verifica se o resultado produzido é o esperado
    expect(Object.keys(userCreated)).toEqual(expected);
  });

  it("encrypt and decrypt field", async () => {
    //Arrange
    //Prepara o ambiente para o teste
    const mockPassword = "123456789";

    //Act
    //Executa a ação que será testada
    const hashMockPassword = generateHash(mockPassword);
    const decryptedMockPassword = decrypt(mockPassword, hashMockPassword);

    //Assert
    // Verifica se o resultado produzido é o esperado
    expect(decryptedMockPassword).toEqual(true);
  });
});

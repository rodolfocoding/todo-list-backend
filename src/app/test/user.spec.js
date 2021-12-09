const app = require("../../index");
const UserRepository = require("../repository/UserRepository");
const request = require("supertest");

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
});

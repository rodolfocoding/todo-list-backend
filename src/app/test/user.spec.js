const app = require("../../index");
const UserRepository = require("../repository/UserRepository");

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
    const users = await UserRepository.getAll();

    //Assert
    expect(Object.keys(users[0]).sort()).toEqual(mockProperties.sort());
  });
});

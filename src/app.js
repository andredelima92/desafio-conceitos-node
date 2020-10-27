const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  if (!title || !url || techs.length === 0) {
    return response
      .status(400)
      .json({ error: "Request needs to contain title, url and techs" });
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex] = {
    ...repositories[repositoryIndex],
    id,
    title,
    url,
    techs,
  };

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({ error: "ID must have a value " });
  }

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if (!id) {
    return responde.json({ error: "ID must have a value " });
  }

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes++;

  response.json(repositories[repositoryIndex]);
});

module.exports = app;

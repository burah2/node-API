const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample in-memory data storage
let resources = [
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' },
];

app.use(bodyParser.json());

// Define RESTful API endpoints
app.get('/api/resource', (req, res) => {
  res.json(resources);
});

app.get('/api/resource/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resource = resources.find((r) => r.id === id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

app.post('/api/resource', (req, res) => {
  const newResource = req.body;
  if (!newResource.name) {
    return res.status(400).json({ message: 'Resource name is required' });
  }
  newResource.id = resources.length + 1;
  resources.push(newResource);
  res.status(201).json(newResource);
});

app.put('/api/resource/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedResource = req.body;
  const resourceIndex = resources.findIndex((r) => r.id === id);
  if (resourceIndex !== -1) {
    if (!updatedResource.name) {
      return res.status(400).json({ message: 'Resource name is required' });
    }
    resources[resourceIndex] = { id, ...updatedResource };
    res.json(resources[resourceIndex]);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

app.delete('/api/resource/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resourceIndex = resources.findIndex((r) => r.id === id);
  if (resourceIndex !== -1) {
    resources.splice(resourceIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

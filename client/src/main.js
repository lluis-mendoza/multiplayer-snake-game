import ClientController from './controllers/clientController.js';

const clientController = new ClientController();
clientController.run(io);


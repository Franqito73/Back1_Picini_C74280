const TicketModel = require('../models/ticket.model');

class TicketService {
  async generateCode() {
    const lastTicket = await TicketModel.findOne().sort({ purchase_datetime: -1 });
    if (!lastTicket) return '000001';
    const lastCodeNum = parseInt(lastTicket.code);
    const newCodeNum = lastCodeNum + 1;
    return newCodeNum.toString().padStart(6, '0');
  }

  async createTicket(amount, purchaser) {
    const code = await this.generateCode();
    const ticket = new TicketModel({
      code,
      amount,
      purchaser,
    });
    return await ticket.save();
  }
}

module.exports = TicketService;

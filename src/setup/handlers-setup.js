import { setupStartCommand } from '../commands/start.js';
import { setupHelpCommand } from '../commands/help.js';
import { setupJennyCommand } from '../commands/jenny-command.js';
import { setupMarketCommands } from '../telegram/market-commands.js';
import { setupGifCommand } from '../commands/gif-command.js';
import { setupPriceCommand } from '../commands/price-command.js';

export function setupHandlers(bot, services) {
  setupStartCommand(bot);
  setupHelpCommand(bot);
  setupJennyCommand(bot, services);
  setupMarketCommands(bot, services.marketService, services.newsService);
  setupGifCommand(bot, services.giphyService);
  setupPriceCommand(bot, services);
}
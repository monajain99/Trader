from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trade import seed_trade, undo_trade
from .account import seed_account, undo_account
from .stock import seed_stock, undo_stocks


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_account()
    # seed_stock()
    seed_trade()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_trade()
    # undo_stocks()
    # undo_account()
    undo_users()

    # Add other undo functions here

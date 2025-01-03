from typing import List, Dict
from phi.tools import Toolkit
from phi.utils.log import logger
import json
class PortfolioTools(Toolkit):
    def __init__(self):
        super().__init__(name="shell_tools")
        self.register(self.get_dummy_data)

    def get_dummy_data(self) -> str:

        dummy_data = {
            "name": "Dummy User",
            "age": 30,
            "city": "Exampleville",
            "crypto_portfolio": {
                "tokens": [
                     {"symbol": "SOL", "amount": 100, "value_usd": 1500},
                     {"symbol": "DOGE", "amount": 10000, "value_usd": 900},
                    {"symbol": "SAMO", "amount": 5000, "value_usd": 250},
                    {"symbol": "COPE", "amount": 2000, "value_usd": 100},
                    {"symbol": "FIDA", "amount": 1500, "value_usd": 300},
                    {"symbol": "KIN", "amount": 100000, "value_usd": 50},
                    {"symbol": "STEP", "amount": 800, "value_usd": 200}
                ],
                "total_value_usd": 3300,
            },
            "hobbies": ["coding", "reading", "hiking"],
        }
        return json.dumps(dummy_data, indent=2)

from phi.agent import Agent
from model import model 
from phi.agent import Agent, RunResponse

from tools.portfolio_anaysis_tool import PortfolioTools

portfolio_tool = PortfolioTools()

def portfolio_analysis(query):


    portfolio_agent = Agent(
    instructions=[
        "You are a portfolio anlyis bot "
        "if the user ask for a portfolio you use the given tool to retrieve their portfolio data " 
        "call  tool portfolio_tool.get_dummy_data() to get the dummy data"],
    tools=[portfolio_tool.get_dummy_data],
    show_tool_calls=False,
    model=model,
    
    role="to do portfolio analysis if asked ",
 
    debug_mode=False)

    response: RunResponse = portfolio_agent.run( query ,stream=False)

    return response.content
    
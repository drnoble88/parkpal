# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)


from authenticator import authenticator


from queries.accounts import (
    AccountIn,
    AccountQueries,
    DuplicateAccountError,
    AccountForm,
    AccountToken,
    HttpError

)

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        print(info.username)
        account = accounts.create(info, hashed_password)

    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    print(form)
    token = await authenticator.login(response, request, form, accounts)
    print(token)
    return AccountToken(account=account, **token.dict())

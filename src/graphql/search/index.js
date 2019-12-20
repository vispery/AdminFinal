import gql from "graphql-tag";
import client from "../client";

const userQuery = gql`
  query Users($keyword: String!, $page: Int, $perPage: Int) {
    Users(params: $keyword, page: $page, perPage: $perPage) {
      users {
        name,
        id,
        email,
        password,
        personalProfile,
        createdAt,
        role,
        token
      }
      numOfPages
    }
  }
`
const AuthenticationsQuery = gql`
  query Authentications($authenticationId: ID){
    Authentications(authenticationId: $authenticationId){
      id,
      createdAt,
      userId,
      managerId,
      scholarId,
      state,
      content
    }
  }
`

const DeleteUserByIdMutation = gql`
  mutation deleteUserById($userId:ID){
    deleteUserById(userId:$userId)
  }
`

const updateuserMutation = gql`
  mutation updateUserInfo($_id:ID,$name:String,$email:String){
    updateUserInfo(_id: $_id, name: $name,email:$email){
      name,
      id,
      email,
    }
  }
`
const updateAuthenticationMutation = gql`
  mutation updateAuthentication($authenticationId:ID!, $decision:Boolean!){
    updateAuthentication(
      authenticationId:$authenticationId,
      decision:$decision
    ){
      id
    }
  }
`

function updateAuthentication(authenticationId, decision) {
  return client.mutate({
    mutation: updateAuthenticationMutation,
    variables: { authenticationId, decision },
  });
}

function updateuser(_id, name, email) {
  return client.mutate({
    mutation: updateuserMutation,
    variables: { _id, name, email },
  })
}

function DeleteUserById(userId) {
  return client.mutate({
    mutation: DeleteUserByIdMutation,
    variables: { userId },
  })
}

function getAllAuthentications(authenticationId) {
  return client.query({
    query: AuthenticationsQuery,
    variables: { authenticationId },
    fetchPolicy: 'network-only'
  })
}

async function spotlight(keyword, page, perPage) {
  // const userQueryResults = await client.query({ query: userQuery, variables: { keyword, page, perPage } });
  // return {
  //   userResponse: userQueryResults.data.Users.users,
  // };
  return client.query({
    query: userQuery,
    variables: { keyword, page, perPage },
    fetchPolicy: 'network-only'
  })
}

export { spotlight, DeleteUserById, updateuser, getAllAuthentications, updateAuthentication };

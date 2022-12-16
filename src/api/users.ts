
import snakecaseKeys from 'snakecase-keys'
import { apiFetch } from '@/api'
import { Group, NewUser, User, ChangePassword, User as EditUser} from '@/interfaces'

async function getUsers(): Promise<User[]> {
  return apiFetch('/users')
}

async function getUserMe(): Promise<User> {
  return apiFetch('/users/me')
}

async function postUser(userData: NewUser): Promise<User> {
  return apiFetch('/users/', 'POST', JSON.stringify(snakecaseKeys(userData)), {
    'Content-Type': 'application/json',
  })
}

async function userEdit(user: EditUser): Promise<User> {
  return apiFetch(
    `/users/${user.id}`, 
    'PATCH', 
    JSON.stringify(snakecaseKeys(user)), 
    {
      'Content-Type': 'application/json',
    })
}

async function getGroups(): Promise<Group[]> {
  return apiFetch('/groups')
}

async function changePasswordMe(passwordForm: ChangePassword): Promise<User> {
  return apiFetch(
    "/users/me/change-password", 
    'POST', 
    JSON.stringify(snakecaseKeys(passwordForm)), 
  {
    'Content-Type': 'application/json',
  })
}

export { getUsers, getUserMe, postUser, getGroups, changePasswordMe, userEdit }

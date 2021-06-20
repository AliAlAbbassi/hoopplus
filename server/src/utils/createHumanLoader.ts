import DataLoader from 'dataloader'
import { Human } from '../entities/Human'

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
export const createHumanLoader = () =>
  new DataLoader<number, Human>(async (userIds) => {
    const users = await Human.findByIds(userIds as number[])
    const userIdToUser: Record<number, Human> = {}
    users.forEach((u) => {
      userIdToUser[u.id] = u
    })

    const sortedUsers = userIds.map((userId) => userIdToUser[userId])
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);
    return sortedUsers
  })

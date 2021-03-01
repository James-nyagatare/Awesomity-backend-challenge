const mockdata = {
  signupUser: {
    firstName: 'Nyagatare',
    lastName: 'James',
    email: 'nyagatarejames@gmail.com',
    password: 'James@2020',
    confirmPassword: 'James@2020'
  },
  signupUserInvalid: {
    firstName: 'Nyagatare',
    lastName: 'James',
    email: 'nyagatarejames@gmail.com',
    password: 'jay',
    confirmPassword: 'J'
  },
  loginUser: {
    email: 'nyagatarejames@gmail.com',
    password: 'James@2020'
  },
  invalidLogin: {
    email: 'nyagatarejames@gmail.com',
    password: 'jimmy'
  },
  verifyEmailToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJueWFnYXRhcmVqYW1lc0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJOeWFnYXRhcmUiLCJsYXN0TmFtZSI6IkphbWVzIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlhdCI6MTYxMzkyNzY3MH0.VbgwY3-YoWyByVGKRmtSbuFsKZjxu10UhRZ6_508gxo',

  resetToken:
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJueWFnYXRhcmVqYW1lc0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJOeWFnYXRhcmUiLCJsYXN0TmFtZSI6IkphbWVzIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjEzOTEyMTU4fQ.Md4Nb6o37iJHheUPxfXYkrBVZcfENaIxOWJrbjBgj7A',
  resetPassword: {
    password: 'Nyagatare@2020',
    confirmPassword: 'Nyagatare@2020'
  },
  resetEmail: {
    email: 'nyagatarejames@gmail.com'
  },
  createTodo: {
    title: 'Moving Trash out',
    description: 'Moving all the inside trashes out of the house for the recycling',
    priority: 'MEDIUM'
  },
  anotherTodo: {
    title: 'Traveling the world',
    description: 'Traveling from Rwanda to Us then to UK and meet the queen',
    priority: 'HIGH'
  },
  updatedTodo: {
    title: 'Moving Trash out',
    description: 'Moving all the inside trashes out of the house for the recycling',
    priority: 'HIGH'
  },
  changeStatus: {
    completed: true
  },
  invalidTodo: {
    title: 'Moving Trash out',
    description: 'Moving all the inside trashes out of the house for the recycling',
    priority: 'yeqweweew'
  }
};
export default mockdata;

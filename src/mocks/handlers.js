import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/api/voting-list', () => {
    return HttpResponse.json({
      "voting_lists":[
        {
          "voting_id": "v001",
          "voting_name": "Best Movie of 2024",
          "voting_date": "2024-10-01"
        },
        {
          "voting_id": "v002",
          "voting_name": "Favorite Programming Language",
          "voting_date": "2024-09-15"
        },
        {
          "voting_id": "v003",
          "voting_name": "Company Annual Picnic Location",
          "voting_date": "2024-10-05"
        }
      ]
    })
  }),
]
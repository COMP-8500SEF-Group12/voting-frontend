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
  http.get('/api/voting-detail',({request})=>{
    // 前端会传递query 给后端，例如：
    // GET /voting-detail?voting_id=12345&user_id=s123456
     const url = new URL(request.url)
     const votingId = url.searchParams.get('voting_id')
    return HttpResponse.json({
  	  "is_voted":"0",
  	  "voting_id": votingId, 
      "voting_name": "投票选出开会日期", 
      "voting_description": "这是一个投票",
      "voting_date":"2024 年 10 月 14 日",
      "voting_options":[
      		{
    			"option_id":"1",
      			"option_title":"选择地点",
      			"option_type": "single",
      			"option_list":[
      				{
	    				"list_id":"1",
    	  				"list_title":"主校区"
    				},
			        {
	    				"list_id":"2",
    	  				"list_title":"赛马会校区"
    				},
 			        {
	    				"list_id":"3",
    	  				"list_title":"赛马会护理健康学院校区"
    				},
      			]
    		},
			 {
    			"option_id":"2",
      			"option_title":"选择时间",
      			"option_type": "multi",
      			"option_list":[
      				{
	    				"list_id":"1",
    	  				"list_title":"9:00-12:00"
    				},
			        {
	    				"list_id":"2",
    	  				"list_title":"12:00-14:00"
    				},
 			        {
	    				"list_id":"3",
    	  				"list_title":"18:00-21:00"
    				},
      			]
    		}
      ]
})
  })
]
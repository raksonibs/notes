## KIlling Cors
### Damon Aw

With this setup, we had to deal with making CORS requests from app.example.com to api.example.com in one of the two ways:
1. Find a way to proxy requests so that there’s no CORS
2. API serves CORS headers for app.example.com
-We chose 2 to reduce the complexity of dealing with forwarding and proxies. Serving headers is easy thanks to the rack-cors gem. In normal requests, the headers look like this:
Access-Control-Allow-Credentials:true
Access-Control-Allow-Methods:POST, GET
Access-Control-Allow-Origin:http://localhost:3000
Access-Control-Expose-Headers:
Access-Control-Max-Age:1728000
-preflight requests made when requests are not simple
“preflighted” requests first send an HTTP request by the OPTIONS method to the resource on the other domain, in order to determine whether the actual request is safe to send. Cross-site requests are preflighted like this since they may have implications to user data.
preflight request is a “security by awareness” measure
- The browser makes an OPTIONS request is sent to a server without any CORS awareness. This will fail and protect the server from potentially executing a forged cross-domain DELETE request.
-The browser does not make an OPTIONS request, the server with awareness can potentially not allow the request. Web frameworks don’t do this because in lieu of better security measures, such as CSRF or using sessionless authentication.
- It is also unfortunate that preflight requests are incompatible with one of its bigger use case — Sending cross site JSON POST/PATCH requests because it sets the Content-Type to application/json.
-This is a good lesson, request latencies across long distances do become significant. In our case, since each CORs request makes a preflight check, it doubles this significant latency without adding any value
-Preflight requests can be cached by the browser if we remember to serve the Access-Control-Max-Age header. Make sure this is included in your response headers.
-But… Most browsers don’t allow you to cache the OPTIONS request for this long. For example, Webkit allows a maximum of 600 seconds.
-circumstances where the browser does not make a preflight request, if conditions are met:
- Only uses GET, POST, HEAD methods
- Doesn’t set any manual headers other than those set by the browser and these headers:
 — Accept
 — Accept-Language
 — Content-Language
 — Content-Type
- For Content-Type, the only allowed values:
 — application/x-www-form-urlencoded
 — multipart/form-data
 — text/plain
-simple because of the custom Authorization header and a Content-Type that set to an unacceptable value.
- GET requests don’t have a body and hence does not need to specify a Content-Type. Removing the .type() call removed the header.
-In terms of security, all API calls should be using https and there is little difference in putting the token in headers or as part of the query string. Do beware that the token should be filtered in the logs. In our setup, we used what doorkeeper expects, bearer_token and this gets filtered out by Rails when logging requests (guessing it’s Doorkeeper’s handy work).
-st Attempt — Send JSON but set headers to text/plain
- Since we know the API request to /graph from Relay is always in JSON, hence we can tell Relay to set the headers to text/plain and qualifying as a simple request.
Next,we instruct the backend to change the Content-Type to application/json before reaching Rails’ params parsing layer, the greatest scam is done
- Send data as formData instead, qualifying as a simple request
-iF you have CORS preflight requests and latency significant users:
1. Use the preflight cache
2. Make sure GET requests are simple
After going down the rabbit hole, I think it’s easier and straightforward to fight CORS with reverse proxy such as using nginx to forward requests to your API server. i.e. app.example.com/api proxies requests to api.example.com. 
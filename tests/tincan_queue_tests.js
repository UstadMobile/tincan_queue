/*
    TIN CAN Queue 

    Copyright (C) 2014 Michael Dawson mike@mike-dawson.net

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

(function () {
    var session = null;

    QUnit.module("Tin Can Queue");
    
    var myTinCan = new TinCan();
    var myTinCanQueue = new TinCanQueue();
    
    var myVerb = new TinCan.Verb({
        id : "http://activitystrea.ms/specs/json/schema/activity-schema.html#read",
        display : {
            "en-US":"read"
        }
    });
	
    var myActivityDefinition = new TinCan.ActivityDefinition({
        name : {
            "en-US":"Hello World", 
            "en-GB":"Hello World"
        },
        description : {
            "en-US":"the meaning of life is 42",
            "en-GB":"the meaning of life is 42"
        }
    });
 
    var myActivity = new TinCan.Activity({
        id : "http://www.ustadmobile.com/looking_at_things",
        definition : myActivityDefinition
    });
    
    var myActor = new TinCan.Agent(
        {"name" : tinCanQueueTestSettings['actor']['name'], 
        "mbox" : tinCanQueueTestSettings['actor']['mbox']
    });
	
    var stmt = new TinCan.Statement({
        actor : myActor,
        verb : myVerb,
        target : myActivity
        },{'storeOriginal' : true});
    
    var storedId = myTinCanQueue.queueStatement(stmt);

    test(
        "Store statement provides valid ID",
        function () {
            ok(storedId > 0, "Valid id > 0 returned: " + storedId);
        }
    );
    
    
    var stmtRestored = myTinCanQueue.getPendingStatementById(storedId);
    test(
        "Can restore statement from localStorage string",
        function() {
            ok(stmtRestored instanceof TinCan.Statement, 
                "Returns valid Statement object");
        }
    );
    
}());

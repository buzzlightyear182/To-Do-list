TaskList.showList #GET

TaskList.add_task(params["task"]) #POST

class TaskList

	@@listArray = []

	def self.add_task task_name
		@@listArray << task_name
	end

	def self.showList
		@@listArray.join("\n")
	end
end
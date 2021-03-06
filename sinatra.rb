require 'sinatra'
# require 'PStore'
require 'yaml/store'
require 'json'

#PStore is a big class containing many storage objects
# store = PStore.new('data.PStore') 				#creates a new storage called 'store'

# YAML store (as text file) -->
store = YAML::Store.new("data.yml")

get '/' do
	#to transfer the storage 'store' to index view
	store.transaction do
		@tasklist = store[:task_list]
	end

	erb :index
end

get '/api/items' do
	store.transaction do
		@item_list = store[:task_list]
		@item_list.to_json
	end

end

post '/results' do
	puts "You sent #{params.inspect}"			#prints on console

	#do all or nothing
	store.transaction do
		store[:task_list] ||= []				#create index
		store[:task_list] << params["task"]		#update index
	end											#commit changes to storage
end

post '/deletions' do
	puts "You want to delete #{params.inspect}"
	store.transaction do
		deleteIndex = store[:task_list].index {|x| x == params["task"]}
		store[:task_list].delete_at(deleteIndex);
		@item_list = store[:task_list]
	end
	@item_list.to_json
end


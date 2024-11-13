<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-background" >
        <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-50">
            <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl overflow-scroll">
                <div>
                    <el-form :model="votingForm" ref="vForm" :rules="rules" label-position="left" label-width="150px"
                        size="default" @submit.prevent>

                            <template #header>
                            <div class="clear-fix">
                                <span></span>
                            </div>
                            </template>
                            <el-form-item label="Voting Name" prop="voting_name" class="required label-right-align">
                                <el-input v-model="votingForm.voting_name" type="text" maxlength="150" show-word-limit clearable></el-input>
                            </el-form-item>
                            <el-form-item label="Voting Description" prop="voting_description" class="required label-right-align">
                                <el-input v-model="votingForm.voting_description" type="text" maxlength="200" show-word-limit clearable></el-input>
                            </el-form-item>

                            <div class="static-content-item">
                                <el-divider direction="horizontal"></el-divider>
                            </div>
                            
                            <div>
                                <div v-for="(voting_option, index) in votingForm.voting_options" :key="index" >
                                <el-form :model="voting_option" label-width="120px"  :rules="formRules" label-position="left" size="default" @submit.prevent>
                                    <el-form-item :label="'Option ' + (index + 1)+ ' Title'" class="required label-right-align" prop="option_title">
                                        <el-input v-model="voting_option.option_title" type="text" maxlength="150" show-word-limit clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="Option Type" class="required label-right-align" prop="option_type">
                                        <el-radio-group v-model="voting_option.option_type">
                                            <el-radio label="singleChoice"  value="single">Single Choice</el-radio>
                                            <el-radio label="multipleChoice" value="multiply">Multiple choice</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    
                                    <el-form-item 
                                        v-for="(choice, choiceIndex) in voting_option.option_list" 
                                        :key="choiceIndex"
                                        :label="`Choice ${choiceIndex + 1}`" 
                                        :prop="`option_list[${choiceIndex}].list_title`"
                                    >
                                        <div class="flex justify-center items-center gap-2 w-full">
                                            <el-input v-model="choice.list_title" maxlength="75" show-word-limit clearable></el-input>
                                            <el-button @click="removeChoice(index, choiceIndex)" type="danger" :icon="Delete" circle />
                                        </div>
                                    </el-form-item>                         
                                    <el-button @click="addChoice(index)">Add Choice</el-button>
                                    <el-button @click="removeOption(index)" type="danger">Delete Option</el-button>
                                    <div class="static-content-item">
                                        <el-divider direction="horizontal"></el-divider>
                                    </div>
                                    
                                </el-form>
                                </div>

                            </div>

                            <el-button @click="addOption">Add Option</el-button>
                    </el-form>
                </div>

                    <div class="w-full flex flex-row-reverse gap-2">
                        <Button @click="submitForm">Create</Button>
                        <Button variant="secondary" @click="handleBackClick">Back</Button>
                    </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { useFetch } from '@vueuse/core'
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL, MAX_NUM } from '@/lib/utils'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
const postUrl = `${API_URL}/create-voting`

const votingForm = reactive({
    voting_name:'',
    status: 'open',
    voting_description:'',
    created_by: user.vote_id,
    voting_options:[
        {
            option_title:'',
            option_type:'',
            option_list:[
                { list_title: '' },
            ]
        }

    ]
});

const { execute } = useFetch(postUrl, { immediate: false }).post(votingForm).json()

const rules = reactive({
    voting_name: [{
    required: true,
    message: 'Value cannot be null',
  }],
    voting_description: [{
    required: true,
    message: 'Value cannot be null',
  }]
})

const formRules = reactive({
    option_title: [{
    required: true,
    message: 'Value cannot be null',
  }],
    option_type: [{
    required: true,
    message: 'Value cannot be null',
  }]
})

const vForm = ref(null)

const addOption = () => {
    if(votingForm.voting_options.length >= MAX_NUM) {
        toast.error(`You can only add up to ${MAX_NUM} options`)
        return
    }

    votingForm.voting_options.push({
            option_title:'',
            option_type:'',
            option_list:[
                { list_title: '' },
            ],
    });
};

function addChoice(index) {
    if (votingForm.voting_options[index].option_list.length >= MAX_NUM) {
        toast.error(`You can only add up to ${MAX_NUM} choices`)
        return
    }
    votingForm.voting_options[index].option_list.push({ list_title: '' })
}


function removeChoice(optionIndex, choiceIndex) {
    if (votingForm.voting_options[optionIndex].option_list.length <= 1) {
        toast.error('At least one choice is required')
        return
    }
    votingForm.voting_options[optionIndex].option_list.splice(choiceIndex, 1)
}

function removeOption(optionIndex) {
    if (votingForm.voting_options.length <= 1) {
        toast.error('At least one option is required')
        return
    }
    votingForm.voting_options.splice(optionIndex, 1)

}
const submitForm = async() => {
    const valid = await vForm.value.validate();
    if (!valid) {
        return
    }
    const res = await execute();
    if (res.status === 200) {
        toast.success('Create Successfully!')
        router.push('/');
    } else {
        toast.error('Create Unsuccessfully!')
    }
}

function handleBackClick(){
    router.push('/')
}


</script>
